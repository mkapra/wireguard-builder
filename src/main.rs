use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use diesel::prelude::*;
use diesel::sqlite::SqliteConnection;
use dotenv::dotenv;
use std::env;

#[macro_use]
extern crate diesel;

mod models;
use models::Key;

mod schema;
use schema::keys::dsl::*;

struct AppState {
    db_connection: SqliteConnection,
}

pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    SqliteConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}

#[post("/keys")]
async fn post_key(data: web::Data<AppState>) -> impl Responder {
    let key = Key::gen_key();
    let json_key = serde_json::to_string(&key).expect("Could not convert");

    diesel::insert_into(keys)
        .values(&key)
        .execute(&data.db_connection)
        .expect("Error saving new post");

    HttpResponse::Ok().body(json_key)
}

#[get("/keys")]
async fn get_key(data: web::Data<AppState>) -> impl Responder {
    let result = keys
        .load::<Key>(&data.db_connection)
        .expect("Could not get keys");
    let json_keys = serde_json::to_string(&result).expect("Could not convert");

    HttpResponse::Ok().body(json_keys)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .data(AppState {
                db_connection: establish_connection(),
            })
            .service(post_key)
            .service(get_key)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
