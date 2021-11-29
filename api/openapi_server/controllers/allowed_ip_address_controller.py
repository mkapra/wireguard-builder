import connexion
import six

from openapi_server.models.allowed_ip import AllowedIp  # noqa: E501
from openapi_server.models.error import Error  # noqa: E501
from openapi_server import util


def create_allowed_ip(allowed_ip):  # noqa: E501
    """Add a new AllowedIP

    Add a new AllowedIp # noqa: E501

    :param allowed_ip: Create a new AllowedIp
    :type allowed_ip: dict | bytes

    :rtype: AllowedIp
    """
    if connexion.request.is_json:
        allowed_ip = AllowedIp.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'


def delete_allowed_ip(allowed_ip_id):  # noqa: E501
    """Deletes a AllowedIp

    Deletes a AllowedIp # noqa: E501

    :param allowed_ip_id: allowed ip address id
    :type allowed_ip_id: int

    :rtype: None
    """
    return 'do some magic!'


def get_allowed_ip(allowed_ip_id):  # noqa: E501
    """Find AlllowedIp by id

    Returns a single AllowedIp # noqa: E501

    :param allowed_ip_id: allowed ip address id
    :type allowed_ip_id: int

    :rtype: AllowedIp
    """
    return 'do some magic!'


def get_allowed_ips():  # noqa: E501
    """Get all AllowedIps

    Get all AllowedIps # noqa: E501


    :rtype: List[AllowedIp]
    """
    return 'do some magic!'


def update_allowed_ip(allowed_ip_id, allowed_ip):  # noqa: E501
    """Update a AllowedIP

    Update a AllowedIP # noqa: E501

    :param allowed_ip_id: allowed ip address id
    :type allowed_ip_id: int
    :param allowed_ip: Update a AllowedIp
    :type allowed_ip: dict | bytes

    :rtype: AllowedIp
    """
    if connexion.request.is_json:
        allowed_ip = AllowedIp.from_dict(connexion.request.get_json())  # noqa: E501
    return 'do some magic!'
