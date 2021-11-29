# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from openapi_server.models.base_model_ import Model
import re
from openapi_server import util

import re  # noqa: E501

class VpnNet(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, id=None, name=None, address=None, subnetmask=24, interface=None, port=None):  # noqa: E501
        """VpnNet - a model defined in OpenAPI

        :param id: The id of this VpnNet.  # noqa: E501
        :type id: int
        :param name: The name of this VpnNet.  # noqa: E501
        :type name: str
        :param address: The address of this VpnNet.  # noqa: E501
        :type address: str
        :param subnetmask: The subnetmask of this VpnNet.  # noqa: E501
        :type subnetmask: int
        :param interface: The interface of this VpnNet.  # noqa: E501
        :type interface: int
        :param port: The port of this VpnNet.  # noqa: E501
        :type port: int
        """
        self.openapi_types = {
            'id': int,
            'name': str,
            'address': str,
            'subnetmask': int,
            'interface': int,
            'port': int
        }

        self.attribute_map = {
            'id': 'id',
            'name': 'name',
            'address': 'address',
            'subnetmask': 'subnetmask',
            'interface': 'interface',
            'port': 'port'
        }

        self._id = id
        self._name = name
        self._address = address
        self._subnetmask = subnetmask
        self._interface = interface
        self._port = port

    @classmethod
    def from_dict(cls, dikt) -> 'VpnNet':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The VpnNet of this VpnNet.  # noqa: E501
        :rtype: VpnNet
        """
        return util.deserialize_model(dikt, cls)

    @property
    def id(self):
        """Gets the id of this VpnNet.


        :return: The id of this VpnNet.
        :rtype: int
        """
        return self._id

    @id.setter
    def id(self, id):
        """Sets the id of this VpnNet.


        :param id: The id of this VpnNet.
        :type id: int
        """
        if id is not None and id > 2147483647:  # noqa: E501
            raise ValueError("Invalid value for `id`, must be a value less than or equal to `2147483647`")  # noqa: E501
        if id is not None and id < 0:  # noqa: E501
            raise ValueError("Invalid value for `id`, must be a value greater than or equal to `0`")  # noqa: E501

        self._id = id

    @property
    def name(self):
        """Gets the name of this VpnNet.

        A unique name for the vpn network  # noqa: E501

        :return: The name of this VpnNet.
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name):
        """Sets the name of this VpnNet.

        A unique name for the vpn network  # noqa: E501

        :param name: The name of this VpnNet.
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
    def address(self):
        """Gets the address of this VpnNet.

        The ip address of the vpn network  # noqa: E501

        :return: The address of this VpnNet.
        :rtype: str
        """
        return self._address

    @address.setter
    def address(self, address):
        """Sets the address of this VpnNet.

        The ip address of the vpn network  # noqa: E501

        :param address: The address of this VpnNet.
        :type address: str
        """
        if address is None:
            raise ValueError("Invalid value for `address`, must not be `None`")  # noqa: E501
        if address is not None and len(address) > 15:
            raise ValueError("Invalid value for `address`, length must be less than or equal to `15`")  # noqa: E501
        if address is not None and not re.search(r'^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$', address):  # noqa: E501
            raise ValueError("Invalid value for `address`, must be a follow pattern or equal to `/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/`")  # noqa: E501

        self._address = address

    @property
    def subnetmask(self):
        """Gets the subnetmask of this VpnNet.

        The subnet mask of the vpn network in CIDR format  # noqa: E501

        :return: The subnetmask of this VpnNet.
        :rtype: int
        """
        return self._subnetmask

    @subnetmask.setter
    def subnetmask(self, subnetmask):
        """Sets the subnetmask of this VpnNet.

        The subnet mask of the vpn network in CIDR format  # noqa: E501

        :param subnetmask: The subnetmask of this VpnNet.
        :type subnetmask: int
        """
        if subnetmask is not None and subnetmask > 32:  # noqa: E501
            raise ValueError("Invalid value for `subnetmask`, must be a value less than or equal to `32`")  # noqa: E501
        if subnetmask is not None and subnetmask < 1:  # noqa: E501
            raise ValueError("Invalid value for `subnetmask`, must be a value greater than or equal to `1`")  # noqa: E501

        self._subnetmask = subnetmask

    @property
    def interface(self):
        """Gets the interface of this VpnNet.

        The number of the wg network interface on the server. The name of the interface will be wg\\<interface\\>   # noqa: E501

        :return: The interface of this VpnNet.
        :rtype: int
        """
        return self._interface

    @interface.setter
    def interface(self, interface):
        """Sets the interface of this VpnNet.

        The number of the wg network interface on the server. The name of the interface will be wg\\<interface\\>   # noqa: E501

        :param interface: The interface of this VpnNet.
        :type interface: int
        """
        if interface is None:
            raise ValueError("Invalid value for `interface`, must not be `None`")  # noqa: E501
        if interface is not None and interface > 500:  # noqa: E501
            raise ValueError("Invalid value for `interface`, must be a value less than or equal to `500`")  # noqa: E501
        if interface is not None and interface < 0:  # noqa: E501
            raise ValueError("Invalid value for `interface`, must be a value greater than or equal to `0`")  # noqa: E501

        self._interface = interface

    @property
    def port(self):
        """Gets the port of this VpnNet.

        The port that the server should listen on  # noqa: E501

        :return: The port of this VpnNet.
        :rtype: int
        """
        return self._port

    @port.setter
    def port(self, port):
        """Sets the port of this VpnNet.

        The port that the server should listen on  # noqa: E501

        :param port: The port of this VpnNet.
        :type port: int
        """
        if port is None:
            raise ValueError("Invalid value for `port`, must not be `None`")  # noqa: E501
        if port is not None and port > 65535:  # noqa: E501
            raise ValueError("Invalid value for `port`, must be a value less than or equal to `65535`")  # noqa: E501
        if port is not None and port < 1:  # noqa: E501
            raise ValueError("Invalid value for `port`, must be a value greater than or equal to `1`")  # noqa: E501

        self._port = port