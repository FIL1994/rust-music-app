#[macro_use]
extern crate neon;
extern crate neon_serde;

#[macro_use]
extern crate serde_derive;
extern crate serde_bytes;
extern crate serde_json;

#[macro_use]
extern crate lazy_static;

use neon::prelude::*;
use std::fs::File;
use std::io::BufReader;
use neon::handle::Handle;
use std::sync::{Mutex, MutexGuard};

// https://users.rust-lang.org/t/neon-electron-undefined-symbol-cxa-pure-virtual/21223
#[no_mangle]
pub extern fn __cxa_pure_virtual() {
    loop {};
}

lazy_static! {
    static ref PLAYER :Mutex<Player> = {
        let device = rodio::default_output_device().unwrap();
        let sink = rodio::Sink::new(&device);

        Mutex::new(Player { sink, device })
    };
}

struct Player {
    sink: rodio::Sink,
    device: rodio::Device,
}

impl Player {
    fn reset_sink(&mut self) {
        self.sink = rodio::Sink::new(&self.device);
    }
}

fn get_player<'a>() -> MutexGuard<'a, Player> {
    PLAYER.lock().unwrap()
}

register_module!(mut cx, {
    cx.export_function("hello", hello)?;
    cx.export_function("parse", parse)?;

    cx.export_function("playSong", play_song)?;
    cx.export_function("pauseSong", pause_song)?;
    cx.export_function("resumeSong", resume_song)?;
    cx.export_function("stopSong", stop_song)?;

    Ok(())
});

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}

fn parse(mut cx: FunctionContext) -> JsResult<JsValue> {
    let s = cx.argument::<JsString>(0)?;

    let o: serde_json::Value =
        serde_json::from_str(&s.value()).or_else(|err| cx.throw_error(&err.to_string()))?;

    let o = neon_serde::to_value(&mut cx, &o)?;

    Ok(o)
}

fn play_song(mut cx: FunctionContext) -> JsResult<JsString> {
    let path: Handle<JsString> = cx.argument::<JsString>(0)?;
    let file_path = path.value();

    // println!("path from rust: {}", file_path);

    let file = File::open(file_path).unwrap();
    let source = rodio::Decoder::new(BufReader::new(file)).unwrap();

    get_player().sink.append(source);

    Ok(cx.string("ok"))
}

fn pause_song(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    get_player().sink.pause();

    Ok(cx.undefined())
}

fn resume_song(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    get_player().sink.play();

    Ok(cx.undefined())
}

fn stop_song(mut cx: FunctionContext) -> JsResult<JsUndefined> {
    get_player().sink.stop();
    get_player().reset_sink();

    Ok(cx.undefined())
}
