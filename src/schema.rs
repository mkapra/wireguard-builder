table! {
    allowed_ips (id) {
        id -> Integer,
        ip -> Text,
        description -> Nullable<Text>,
    }
}

table! {
    client_allowed_ips (allowed_ip_id, client_id) {
        allowed_ip_id -> Integer,
        client_id -> Integer,
    }
}

table! {
    clients (id) {
        id -> Integer,
        name -> Text,
        description -> Nullable<Text>,
        dns_server_id -> Integer,
        keepalive -> Nullable<Integer>,
        key_id -> Integer,
        ip_id -> Integer,
    }
}

table! {
    dns_servers (id) {
        id -> Integer,
        ip -> Text,
    }
}

table! {
    keys (id) {
        id -> Integer,
        priv_key -> Text,
        pub_key -> Text,
    }
}

table! {
    servers (id) {
        id -> Integer,
        name -> Text,
        description -> Nullable<Text>,
        forward_interface -> Nullable<Text>,
        vpn_net_id -> Integer,
        key_id -> Integer,
    }
}

table! {
    vpn_ips (id, address, net_id) {
        id -> Integer,
        address -> Text,
        net_id -> Integer,
    }
}

table! {
    vpn_nets (id) {
        id -> Integer,
        address -> Text,
        subnetmask -> Integer,
        interface -> Text,
        port -> Integer,
    }
}

joinable!(client_allowed_ips -> allowed_ips (allowed_ip_id));
joinable!(client_allowed_ips -> clients (client_id));
joinable!(clients -> dns_servers (dns_server_id));
joinable!(clients -> keys (key_id));
joinable!(servers -> keys (key_id));
joinable!(servers -> vpn_nets (vpn_net_id));
joinable!(vpn_ips -> vpn_nets (net_id));

allow_tables_to_appear_in_same_query!(
    allowed_ips,
    client_allowed_ips,
    clients,
    dns_servers,
    keys,
    servers,
    vpn_ips,
    vpn_nets,
);
