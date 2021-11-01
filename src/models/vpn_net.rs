use crate::schema::vpn_nets;
use serde::{Deserialize, Serialize};

#[derive(Debug, Queryable, Serialize)]
pub struct VpnNet {
    id: i32,
    address: String,
    subnetmask: i32,
    interface: String,
    port: i32,
}

#[derive(Insertable, Serialize, Deserialize)]
#[table_name = "vpn_nets"]
pub struct NewVpnNet {
    pub address: String,
    pub subnetmask: i32,
    pub interface: String,
    pub port: i32,
}
