import connexion
import six

from openapi_server.models.error import Error  # noqa: E501
from openapi_server.models.vpn_net import VpnNet  # noqa: E501
from openapi_server import util


def create_vpn_network(vpn_net):  # noqa: E501
    """Add a new VPN Network

    Add a new VPN Network # noqa: E501

    :param vpn_net: Create a new VPN network
    :type vpn_net: dict | bytes

    :rtype: VpnNet
    """
    if connexion.request.is_json:
        vpn_net = VpnNet.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def delete_vpn_network(vpn_net_id):  # noqa: E501
    """Deletes a vpn network

    Deletes a vpn network # noqa: E501

    :param vpn_net_id: VPN network id
    :type vpn_net_id: int

    :rtype: None
    """
    return 'do some magic!'


def get_vpn_network(vpn_net_id):  # noqa: E501
    """Find vpn network by id

    Returns a single vpn network # noqa: E501

    :param vpn_net_id: VPN network id
    :type vpn_net_id: int

    :rtype: VpnNet
    """
    return 'do some magic!'


def get_vpn_networks():  # noqa: E501
    """Get all vpn networks

    Retrieves all vpn networks # noqa: E501


    :rtype: List[VpnNet]
    """
    return 'do some magic!'


def update_vpn_network(vpn_net_id, vpn_net):  # noqa: E501
    """Update a vpn network

    Update a vpn network # noqa: E501

    :param vpn_net_id: VPN network id
    :type vpn_net_id: int
    :param vpn_net: Update a vpn network
    :type vpn_net: dict | bytes

    :rtype: VpnNet
    """
    if connexion.request.is_json:
        vpn_net = VpnNet.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
