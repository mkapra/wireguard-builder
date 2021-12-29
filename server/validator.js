// Validates the given ip address
module.exports.isIP = function (ip) {
  if (ip !== undefined && ip !== null && ip !== '') {
    const ipRegex =
        /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
    return ipRegex.test(ip)
  }
  return false
}

module.exports.isInRange = function (ip, net, cidr_subnet) {
  const ip_address = ip.split('.')
  const net_address = net.split('.')
  var cidr_subnet = parseInt(cidr_subnet)
  const ip_net = parseInt(ip_address[0]) << 24 | parseInt(ip_address[1]) << 16 | parseInt(ip_address[2]) << 8 | parseInt(ip_address[3])
  const net_net = parseInt(net_address[0]) << 24 | parseInt(net_address[1]) << 16 | parseInt(net_address[2]) << 8 | parseInt(net_address[3])
  const mask = 0xffffffff << (32 - cidr_subnet)
  return (ip_net & mask) == (net_net & mask)
}

module.exports.isValidCidrSubnet = function (cidr_subnet) {
  if (cidr_subnet !== undefined && cidr_subnet !== null && cidr_subnet !== '') {
    var cidr_subnet = parseInt(cidr_subnet)
    if (cidr_subnet < 0 || cidr_subnet > 32) {
      return (null, false)
    }

    return (cidr_subnet, true)
  }

  return (null, false)
}

module.exports.isValidPort = function (port) {
  if (port !== undefined && port !== null && port !== '') {
    var port = parseInt(port)
    if (port < 0 || port > 65535) {
      return (null, false)
    }

    return (port, true)
  }

  return (null, false)
}
