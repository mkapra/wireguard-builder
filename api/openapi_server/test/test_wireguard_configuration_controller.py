# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from openapi_server.models.error import Error  # noqa: E501
from openapi_server.models.vpn_net import VpnNet  # noqa: E501
from openapi_server.models.wireguard_config import WireguardConfig  # noqa: E501
from openapi_server.test import BaseTestCase


class TestWireguardConfigurationController(BaseTestCase):
    """WireguardConfigurationController integration test stubs"""

    def test_get_config_for_client(self):
        """Test case for get_config_for_client

        Returns a configuration for a VPN client
        """
        query_string = [('clientIdConfig', 56)]
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/client/getConfig',
            method='GET',
            headers=headers,
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_config_for_server(self):
        """Test case for get_config_for_server

        Returns a configuration for a VPN server
        """
        query_string = [('serverIdConfig', 56)]
        headers = { 
            'Authorization': 'Bearer special-key',
        }
        response = self.client.open(
            '/api/server/getConfig',
            method='GET',
            headers=headers,
            query_string=query_string)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
