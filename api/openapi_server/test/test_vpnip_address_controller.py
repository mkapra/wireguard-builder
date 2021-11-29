# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.error import Error  # noqa: E501
from openapi_server.models.vpn_ip import VpnIp  # noqa: E501
from openapi_server.test import BaseTestCase


class TestVPNIPAddressController(BaseTestCase):
    """VPNIPAddressController integration test stubs"""

    def test_create_vpn_ip(self):
        """Test case for create_vpn_ip

        Add a new VPN ip address
        """
        vpn_ip = {
  "vpnNet" : {
    "address" : "address",
    "port" : 60957,
    "name" : "name",
    "id" : 1210617418,
    "interface" : 353,
    "subnetmask" : 8
  },
  "address" : "address"
}
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/vpn_ip',
            method='POST',
            headers=headers,
            data=json.dumps(vpn_ip),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_ip_address(self):
        """Test case for delete_ip_address

        Deletes a VPN ip address
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/vpn_ip/{vpn_ip_id}'.format(vpn_ip_id=56),
            method='DELETE',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_ip(self):
        """Test case for get_ip

        Get all vpn ip addresses
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/vpn_ip',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_vpn_ip_address(self):
        """Test case for get_vpn_ip_address

        Find VPN ip address by id
        """
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/vpn_ip/{vpn_ip_id}'.format(vpn_ip_id=56),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_update_ip_address(self):
        """Test case for update_ip_address

        Update a VPN ip address
        """
        vpn_ip = {
  "vpnNet" : {
    "address" : "address",
    "port" : 60957,
    "name" : "name",
    "id" : 1210617418,
    "interface" : 353,
    "subnetmask" : 8
  },
  "address" : "address"
}
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/vpn_ip/{vpn_ip_id}'.format(vpn_ip_id=56),
            method='PUT',
            headers=headers,
            data=json.dumps(vpn_ip),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
