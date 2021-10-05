use crate::schema::vpn_nets;
use serde::Serialize;

#[derive(Debug, Queryable, Serialize)]
pub struct VpnNet {
    id: i32,
    address: String,
    subnetmask: i32,
    interface: String,
    port: i32,
}


#[derive(Insertable, Serialize)]
#[table_name = "vpn_nets"]
pub struct NewVpnNet {
    address: String,
    subnetmask: i32,
    interface: String,
    port: i32,
}
