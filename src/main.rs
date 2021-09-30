use tide::prelude::*;
use tide::Request;

#[derive(Debug, Deserialize)]
struct Server {
    id: u32,

    description: Option<String>,
    forward_interface: Option<String>,
    interface_id: u32,
    listen_address: String,
    listen_port: u32,
    name: String,
    private_key: String,
    public_key: String,
    vpn_net: String,
}

#[derive(Debug, Deserialize, PartialEq)]
struct Client {
    id: u32,
    priv_key: String,
    pub_key: String,
    name: String,
    description: Option<String>,
    allowed_ips: Vec<String>,
    ip: String,
    dns_server: Option<String>,
    keepalive: u32,
}

#[async_std::main]
async fn main() -> tide::Result<()> {
    let mut app = tide::new();
    app.at("/server").post(order_shoes);
    app.listen("127.0.0.1:8080").await?;
    Ok(())
}

async fn order_shoes(req: Request<()>) -> tide::Result {
    Ok("BLA".into())
}
