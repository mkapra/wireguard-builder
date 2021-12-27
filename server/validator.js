// Validates the given ip address
module.exports.isIP = function(ip) {
    if (ip !== undefined && ip !== null && ip !== "") {
      var ipRegex =
        /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
      return ipRegex.test(ip);
    }
    return false;
};

module.exports.isInRange = function(ip, net, cidr_subnet) {
    var ip_address = ip.split('.');
    var net_address = net.split('.');
    var cidr_subnet = parseInt(cidr_subnet);
    var ip_net = parseInt(ip_address[0]) << 24 | parseInt(ip_address[1]) << 16 | parseInt(ip_address[2]) << 8 | parseInt(ip_address[3]);
    var net_net = parseInt(net_address[0]) << 24 | parseInt(net_address[1]) << 16 | parseInt(net_address[2]) << 8 | parseInt(net_address[3]);
    var mask = 0xffffffff << (32 - cidr_subnet);
    return (ip_net & mask) == (net_net & mask);
};