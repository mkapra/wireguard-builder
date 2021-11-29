# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from openapi_server.models.base_model_ import Model
import re
from openapi_server import util

import re  # noqa: E501

class AllowedIp(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, ip_address=None, description=None):  # noqa: E501
        """AllowedIp - a model defined in OpenAPI

        :param ip_address: The ip_address of this AllowedIp.  # noqa: E501
        :type ip_address: str
        :param description: The description of this AllowedIp.  # noqa: E501
        :type description: str
        """
        self.openapi_types = {
            'ip_address': str,
            'description': str
        }

        self.attribute_map = {
            'ip_address': 'ipAddress',
            'description': 'description'
        }

        self._ip_address = ip_address
        self._description = description

    @classmethod
    def from_dict(cls, dikt) -> 'AllowedIp':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The AllowedIp of this AllowedIp.  # noqa: E501
        :rtype: AllowedIp
        """
        return util.deserialize_model(dikt, cls)

    @property
    def ip_address(self):
        """Gets the ip_address of this AllowedIp.

        The ip address that should be allowed  # noqa: E501

        :return: The ip_address of this AllowedIp.
        :rtype: str
        """
        return self._ip_address

    @ip_address.setter
    def ip_address(self, ip_address):
        """Sets the ip_address of this AllowedIp.

        The ip address that should be allowed  # noqa: E501

        :param ip_address: The ip_address of this AllowedIp.
        :type ip_address: str
        """
        if ip_address is not None and len(ip_address) > 15:
            raise ValueError("Invalid value for `ip_address`, length must be less than or equal to `15`")  # noqa: E501
        if ip_address is not None and not re.search(r'^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$', ip_address):  # noqa: E501
            raise ValueError("Invalid value for `ip_address`, must be a follow pattern or equal to `/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/`")  # noqa: E501

        self._ip_address = ip_address

    @property
    def description(self):
        """Gets the description of this AllowedIp.

        A more detailed optional description of the allowed ip address  # noqa: E501

        :return: The description of this AllowedIp.
        :rtype: str
        """
        return self._description

    @description.setter
    def description(self, description):
        """Sets the description of this AllowedIp.

        A more detailed optional description of the allowed ip address  # noqa: E501

        :param description: The description of this AllowedIp.
        :type description: str
        """
        if description is not None and len(description) > 255:
            raise ValueError("Invalid value for `description`, length must be less than or equal to `255`")  # noqa: E501
        if description is not None and not re.search(r'^[a-zA-Z0-9_\-\s]*$', description):  # noqa: E501
            raise ValueError("Invalid value for `description`, must be a follow pattern or equal to `/^[a-zA-Z0-9_\-\s]*$/`")  # noqa: E501

        self._description = description