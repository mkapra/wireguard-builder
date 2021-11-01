use actix_web::{App, HttpServer};

#[macro_use]
extern crate diesel;

mod models;
mod schema;

mod controllers;
use controllers::key::*;
use controllers::dns_server::*;
use controllers::vpn_net::*;
use controllers::allowed_ip::*;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .data(wireguard_api_rs::AppState {
                db_connection: wireguard_api_rs::establish_connection(),
            })
            .service(get_keys)
            .service(get_key)
            .service(post_key)

            .service(get_dns_servers)
            .service(get_dns_server)
            .service(post_dns_servers)

            .service(get_vpn_nets)
            .service(get_vpn_net)
            .service(post_vpn_nets)

            .service(get_allowed_ips)
            .service(get_allowed_ip)
            .service(post_allowed_ips)
    })
    .bind("127.0.0.1:8180")?
    .run()
    .await
}
