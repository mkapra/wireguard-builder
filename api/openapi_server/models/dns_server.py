# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from openapi_server.models.base_model_ import Model
import re
from openapi_server import util

import re  # noqa: E501

class DnsServer(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, id=None, name=None, ip_address=None):  # noqa: E501
        """DnsServer - a model defined in OpenAPI

        :param id: The id of this DnsServer.  # noqa: E501
        :type id: int
        :param name: The name of this DnsServer.  # noqa: E501
        :type name: str
        :param ip_address: The ip_address of this DnsServer.  # noqa: E501
        :type ip_address: str
        """
        self.openapi_types = {
            'id': int,
            'name': str,
            'ip_address': str
        }

        self.attribute_map = {
            'id': 'id',
            'name': 'name',
            'ip_address': 'ipAddress'
        }

        self._id = id
        self._name = name
        self._ip_address = ip_address

    @classmethod
    def from_dict(cls, dikt) -> 'DnsServer':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The DnsServer of this DnsServer.  # noqa: E501
        :rtype: DnsServer
        """
        return util.deserialize_model(dikt, cls)

    @property
    def id(self):
        """Gets the id of this DnsServer.


        :return: The id of this DnsServer.
        :rtype: int
        """
        return self._id

    @id.setter
    def id(self, id):
        """Sets the id of this DnsServer.


        :param id: The id of this DnsServer.
        :type id: int
        """
        if id is not None and id > 2147483647:  # noqa: E501
            raise ValueError("Invalid value for `id`, must be a value less than or equal to `2147483647`")  # noqa: E501
        if id is not None and id < 0:  # noqa: E501
            raise ValueError("Invalid value for `id`, must be a value greater than or equal to `0`")  # noqa: E501

        self._id = id

    @property
    def name(self):
        """Gets the name of this DnsServer.

        A unique name for the DNS server  # noqa: E501

        :return: The name of this DnsServer.
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name):
        """Sets the name of this DnsServer.

        A unique name for the DNS server  # noqa: E501

        :param name: The name of this DnsServer.
        :type name: str
        """
        if name is None:
            raise ValueError("Invalid value for `name`, must not be `None`")  # noqa: E501
        if name is not None and len(name) > 100:
            raise ValueError("Invalid value for `name`, length must be less than or equal to `100`")  # noqa: E501
        if name is not None and not re.search(r'^[a-zA-Z0-9_\-\s]*$', name):  # noqa: E501
            raise ValueError("Invalid value for `name`, must be a follow pattern or equal to `/^[a-zA-Z0-9_\-\s]*$/`")  # noqa: E501

        self._name = name

    @property
    def ip_address(self):
        """Gets the ip_address of this DnsServer.

        The ip address of the DNS server  # noqa: E501

        :return: The ip_address of this DnsServer.
        :rtype: str
        """
        return self._ip_address

    @ip_address.setter
    def ip_address(self, ip_address):
        """Sets the ip_address of this DnsServer.

        The ip address of the DNS server  # noqa: E501

        :param ip_address: The ip_address of this DnsServer.
        :type ip_address: str
        """
        if ip_address is None:
            raise ValueError("Invalid value for `ip_address`, must not be `None`")  # noqa: E501
        if ip_address is not None and len(ip_address) > 15:
            raise ValueError("Invalid value for `ip_address`, length must be less than or equal to `15`")  # noqa: E501
        if ip_address is not None and not re.search(r'^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$', ip_address):  # noqa: E501
            raise ValueError("Invalid value for `ip_address`, must be a follow pattern or equal to `/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/`")  # noqa: E501

        self._ip_address = ip_address