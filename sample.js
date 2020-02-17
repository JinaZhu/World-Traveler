const sample = [
    {
        'address_components': [
            {
                'long_name': 'Egypt',
                'short_name': 'EG', 'types': ['country', 'political']
            }],
        'formatted_address': 'Egypt',
        'geometry': {
            'bounds': { 'northeast': { 'lat': 31.8122, 'lng': 37.0569 }, 'southwest': { 'lat': 21.9999999, 'lng': 24.696775 } }, 'location': {
                'lat': 26.820553, 'lng': 30.802498
            }, 'location_type': 'APPROXIMATE', 'viewport': { 'northeast': { 'lat': 31.8122, 'lng': 37.0569 }, 'southwest': { 'lat': 21.9999999, 'lng': 24.696775 } }
        },
        'place_id': 'ChIJ6TZcw3aJNhQRRMTEJQmgRSw', 'types': ['country', 'political']
    }]

const sample2 = {
    'html_attributions': [],
    'result': {
        'address_components': [{ 'long_name': 'Australia', 'short_name': 'AU', 'types': ['country', 'political'] }],
        'adr_address': '<span class="country-name">Australia</span>',
        'formatted_address': 'Australia',
        'geometry': { 'location': { 'lat': -25.274398, 'lng': 133.775136 }, 'viewport': { 'northeast': { 'lat': -0.6911343999999999, 'lng': 166.7429167 }, 'southwest': { 'lat': -51.66332320000001, 'lng': 100.0911072 } } },
        'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
        'id': '3ba963f8de67dc16df0a8de60e46418338a3181a',
        'name': 'Australia',
        'photos': [
            {
                'height': 1877,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/118124468608728972055">ESPARTANO</a>'],
                'photo_reference': 'CmRaAAAAM5cJN_u8dAuQRoZ8LQke2r3F6p33gFH4R2WlZNYXkMaTaRSaIoAkgx9abC_rpgMJGMZ8LoRqY4Mp1UgYncfQrqxWq1uW6hJ9u1kOK9oyl1Ukug0Sn2IIKOLKuz6BBnU-EhDSRKZPknwpVW2iIhsUJp7QGhSLq8T6frABgIJerPskhGV-1Dwi9g',
                'width': 1080
            },
            {
                'height': 784,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/115734151023276155981">1</a>'],
                'photo_reference': 'CmRaAAAASznZXfXZOuWajhBrt2K3-VeLwCjLANvCPo3CFoC-o07yMKAYSjLP9a16KG6Br2UVQ27LEGX6RCCryK-OnIsWVja28CBpk_ZWKGtBCVEWEGnEfMywKEVxnEaalsmDZluYEhCAKpqzacniqI2c7UbuRcM4GhQfFlzELqrbIQtIGQX8GQpuaXUE9w',
                'width': 1075
            },
            {
                'height': 887,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/107821843767731127658">Richard Harrison</a>'],
                'photo_reference': 'CmRaAAAAmrOYNkYknejGFlKbtmj-_8iVGGfCossqdlwbvEORuA6TUQ6RQSZ6x9uAy_e0JWMLYX-q0SQ4sJ2mLaQnnaUUhI2me6j1yD9MUia0M0qTvVbpgJRBG2b8qNil-Yf1KvBKEhBw7PQGqPO5K_G8r74wrfneGhRPJ-EnU9Qa29Dx8pBSP2TjpGxDwA',
                'width': 1286
            },
            {
                'height': 1836,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/108160727394308837863">Bilquis Ara</a>'],
                'photo_reference': 'CmRaAAAABAD8LPa7vtUux28aIwq4wFHAdlhacdO3k7TJsaphRNYi2mvY70Qmn93H-PTSv_J6_E8xbeWNWVV_q08N2b1c0ItL6P-hV_dM1rEJalYigjkW88U_7cZszsQgyGIXLqzMEhBJJB8SXJ95c8QwzPIl1NegGhRFW4RzIAXyrMXK01H8gBaVwiVMnQ',
                'width': 3264
            },
            {
                'height': 2268,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/108530675871675410841">CHRISTIAN FERNANDO GUTIERREZ VERA</a>'],
                'photo_reference': 'CmRaAAAAfvU0lATF_VzgZgpYSXTlp5DaSFOWpuUZIJuzYAbn8vY9QhtLMNYtaQjROOV_d0P9cSgOQu4n9lrnCNBP5SJKs6s2Ix00ITmLRsG8uVQKTNhHGao_hCHZA5tuFahh0R6VEhAN27gIXFFBjn9FpdPp2cydGhRH63GZE1vpV3NVFlV_m7BMOLXP6A',
                'width': 4032
            },
            {
                'height': 563,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/111783078007817435674">Dr SNQ</a>'],
                'photo_reference': 'CmRaAAAANeoWPn5FIHb65LwGFt6sZQsbjFPzIcfC5q4I5tVwO60LMYm_RSBZeVPRmGfjT4_4W0MKmU6-qK9__7H0Xc31HZ8F2h5PoOcoacu3BCdtb76hhi1uC1xYLJ_V3Uei2jrZEhDz4ybjuuVogUwMgTwbSUzfGhRJgw399VrpCsxrQf7Y8Loi9fMezg',
                'width': 1000
            },
            {
                'height': 415,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/111783078007817435674">Dr SNQ</a>'],
                'photo_reference': 'CmRaAAAAIAAapz3XhmMkoshyjWz5pk_wP1kMZocKfsS9JEB1x5rackGoniSPEZ0s_fi23IR3oPK6xBNppbKMB4_rxSIkH2INs_kgva-t86_fkEP6lJ_ln4X9TbFJcLnFpRBiM45cEhD9_YxrPl30MjbMk-V7uFRVGhRdU6YktOoI9MTcp4Cd_or_lT55Kw',
                'width': 738
            },
            {
                'height': 960,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/117377762110860852590">SPCA663 Little B</a>'],
                'photo_reference': 'CmRaAAAApmRSQBZzutpX8M1I87rKrI-Pg7hkO15cUynqjI5mNWhvdJyqj6yhFc37QYKF-vVA0oIpfmaROEQQvVZSu7w2OeCPhqGdJxyN1J229OLenOirVubiMJAJBeMY5_hwghQjEhAZ3A1qnr00iXb8CvTplrt2GhQSnDCs4dTwujc0ecHcId5A-335aw',
                'width': 1386
            },
            {
                'height': 2988,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/108572312056820774962">kelvin lo</a>'],
                'photo_reference': 'CmRaAAAAYD9rb9hSeHJ0EiNdpxPocNGIs0ICZTbWggLnaLweYRWlHtOavk4a_siCRcZLj4xEdgNoUmP0uwbGltiR5Mw0JubcdGkIKsgulAseDROrHQ6U50mZEjPIVVPPxmBUPEQAEhCR88yU_bXuvcCkDJT5ng_RGhTOoEke-mIuZHj-WeCXIafOzx_anw',
                'width': 5312
            },
            {
                'height': 1200,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/116134938964134297091">chaitan chopra</a>'],
                'photo_reference': 'CmRaAAAAVSJbbpOk_lnRi-ngNmQ7t-oEcpTqH-3pIyEXjpI_0sIz0qz0WLR_0PbNe0-BaMnFkkeON0hyYMU6XQnc5ws2YEvZMlY8vChtlAvB6wDDP_SPjoNd6nje7Tkaio-pji4dEhDVw4rhB15aaRbT-RaPZxhTGhS27RiK_Aw-vDoTlwp5Zb5RSK-vqw',
                'width': 1600
            }],
        'place_id': 'ChIJ38WHZwf9KysRUhNblaFnglM',
        'reference': 'ChIJ38WHZwf9KysRUhNblaFnglM',
        'scope': 'GOOGLE',
        'types': ['country', 'political'],
        'url': 'https://maps.google.com/?q=Australia&ftid=0x2b2bfd076787c5df:0x538267a1955b1352',
        'utc_offset': 570,
        'website': 'http://australia.gov.au/'
    },
    'status': 'OK'
}