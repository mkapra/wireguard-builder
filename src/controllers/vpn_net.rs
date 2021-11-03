use actix_web::{get, post, web, HttpResponse, Responder};
use diesel::prelude::*;

use crate::models::NewVpnNet;
use crate::models::VpnNet;
use crate::schema::vpn_nets::dsl::*;

#[get("/vpn_nets")]
async fn get_vpn_nets(data: web::Data<wireguard_api_rs::AppState>) -> impl Responder {
    let result = vpn_nets
        .load::<VpnNet>(&data.db_connection)
        .expect("Could not get vpn_nets");
    let json_servers = serde_json::to_string(&result).expect("Could not convert");

    HttpResponse::Ok().body(json_servers)
}

#[get("/vpn_nets/{id}")]
async fn get_vpn_net(
    data: web::Data<wireguard_api_rs::AppState>,
    web::Path((net_id,)): web::Path<(i32,)>,
) -> impl Responder {
    let result = vpn_nets
        .find(net_id)
        .get_result::<VpnNet>(&data.db_connection)
        .expect("Could not get vpn_net");
    let json_server = serde_json::to_string(&result).expect("Could not convert");

    HttpResponse::Ok().body(json_server)
}

#[post("/vpn_nets")]
async fn post_vpn_nets(
    vpn_net: web::Json<NewVpnNet>,
    data: web::Data<wireguard_api_rs::AppState>,
) -> impl Responder {
    if let Ok(_) = vpn_nets
        .filter(
            address
                .eq(&vpn_net.address)
                .and(interface.eq(&vpn_net.interface)),
        )
        .get_result::<VpnNet>(&data.db_connection)
    {
        return HttpResponse::BadRequest().body(r#"{"error": "VPN-Net exists already."}"#);
    }

    let vpn_net_converted = vpn_net.into_inner();
    diesel::insert_into(vpn_nets)
        .values(&vpn_net_converted)
        .execute(&data.db_connection)
        .expect("Error saving new post");

    let created_vpn_net = vpn_nets
        .filter(
            address
                .eq(&vpn_net_converted.address)
                .and(interface.eq(&vpn_net_converted.interface)),
        )
        .get_result::<VpnNet>(&data.db_connection)
        .unwrap();

    let json_server = serde_json::to_string(&created_vpn_net).expect("Could not convert");

    HttpResponse::Ok().body(json_server)
}
