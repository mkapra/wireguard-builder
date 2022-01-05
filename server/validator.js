// Validates the given ip address
const Validator = {
  isIP: (ip) => {
    if (ip !== undefined && ip !== null && ip !== "") {
      const ipRegex =
        /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
      return ipRegex.test(ip);
    }
    return false;
  },
  isInRange: (ip, net, cidr_subnet) => {
    const ipAddress = ip.split(".");
    const netAddress = net.split(".");
    const intCidrSubnet = parseInt(cidr_subnet);
    const ipNet =
      (parseInt(ipAddress[0]) << 24) |
      (parseInt(ipAddress[1]) << 16) |
      (parseInt(ipAddress[2]) << 8) |
      parseInt(ipAddress[3]);
    const net_net =
      (parseInt(netAddress[0]) << 24) |
      (parseInt(netAddress[1]) << 16) |
      (parseInt(netAddress[2]) << 8) |
      parseInt(netAddress[3]);
    const mask = 0xffffffff << (32 - intCidrSubnet);
    return (ipNet & mask) == (net_net & mask);
  },
  isValidCidrSubnet: (cidrSubnet) => {
    if (cidrSubnet !== undefined && cidrSubnet !== null && cidrSubnet !== "") {
      const intCidrSubnet = parseInt(cidrSubnet);
      if (intCidrSubnet < 0 || intCidrSubnet > 32) {
        return null, false;
      }

      return intCidrSubnet, true;
    }

    return null, false;
  },

  isValidPort: (port) => {
    if (port !== undefined && port !== null && port !== "") {
      if (port < 0 || port > 65535) {
        return false;
      }

      return true;
    }

    return false;
  },
};

module.exports = Validator;
