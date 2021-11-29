import connexion
import six

from openapi_server.models.error import Error  # noqa: E501
from openapi_server.models.vpn_ip import VpnIp  # noqa: E501
from openapi_server import util


def create_vpn_ip(vpn_ip):  # noqa: E501
    """Add a new VPN ip address

    Add a new VPN ip address # noqa: E501

    :param vpn_ip: Create a new VPN ip address
    :type vpn_ip: dict | bytes

    :rtype: VpnIp
    """
    if connexion.request.is_json:
        vpn_ip = VpnIp.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def delete_ip_address(vpn_ip_id):  # noqa: E501
    """Deletes a VPN ip address

    Deletes a VPN ip address # noqa: E501

    :param vpn_ip_id: VPN ip address id
    :type vpn_ip_id: int

    :rtype: None
    """
    return 'do some magic!'


def get_ip():  # noqa: E501
    """Get all vpn ip addresses

    Get all vpn ip addresses # noqa: E501


    :rtype: List[VpnIp]
    """
    return 'do some magic!'


def get_vpn_ip_address(vpn_ip_id):  # noqa: E501
    """Find VPN ip address by id

    Returns a single VPN ip address # noqa: E501

    :param vpn_ip_id: VPN ip address id
    :type vpn_ip_id: int

    :rtype: VpnIp
    """
    return 'do some magic!'


def update_ip_address(vpn_ip_id, vpn_ip):  # noqa: E501
    """Update a VPN ip address

    Update a VPN ip address # noqa: E501

    :param vpn_ip_id: VPN ip address id
    :type vpn_ip_id: int
    :param vpn_ip: Update a VPN ip address
    :type vpn_ip: dict | bytes

    :rtype: VpnIp
    """
    if connexion.request.is_json:
        vpn_ip = VpnIp.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
