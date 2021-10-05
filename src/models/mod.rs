mod key;
pub use key::Key;

mod vpn_net;
pub use vpn_net::VpnNet;

mod dns_server;
pub use dns_server::DnsServer;
pub use dns_server::NewDnsServer;

mod allowed_ip;
pub use allowed_ip::AllowedIp;
