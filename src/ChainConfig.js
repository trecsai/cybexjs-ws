let _this;

const ADDRESS_PREFIX = "TREC";

const PREFIX_OF_CHAIN = {
    "39f5e2ede1f8bc1a3a54a7914414e3779e33193f1f5693510e73cb7a87617447": "TEST",
    "c175ba779e8586412b419335b8d0ee9ae0ffea1ca036b61a9a38bbd19327ce09": "TREC"
};

const Network = class {
    constructor(chain_id, core_asset) {
        this.chain_id = chain_id;
        this.core_asset = core_asset;
    }

    get address_prefix() {
        let _global = global || window || {};
        return _global && _global.localStorage &&
            _global.localStorage.getItem(`PREFIX_${this.chain_id}`) ||
            PREFIX_OF_CHAIN[this.chain_id] ||
            this.core_asset;
    };
};

let ecc_config = {
    address_prefix: ADDRESS_PREFIX
};

_this = {
    core_asset: "CORE",
    address_prefix: ADDRESS_PREFIX,
    expire_in_secs: 15,
    expire_in_secs_proposal: 24 * 60 * 60,
    review_in_secs_committee: 24 * 60 * 60,
    networks: {
        Cybex: new Network(
            "c175ba779e8586412b419335b8d0ee9ae0ffea1ca036b61a9a38bbd19327ce09",
            ADDRESS_PREFIX
        ),
        CybexTest: new Network(
            "c175ba779e8586412b419335b8d0ee9ae0ffea1ca036b61a9a38bbd19327ce09",
            ADDRESS_PREFIX
        ),
        Muse: new Network(
            "45ad2d3f9ef92a49b55c2227eb06123f613bb35dd08bd876f2aea21925a67a67",
            "MUSE"
        ),
        Test: new Network(
            "39f5e2ede1f8bc1a3a54a7914414e3779e33193f1f5693510e73cb7a87617447",
            "TEST"
        )
    },

    /** Set a few properties for known chain IDs. */
    setChainId: function (chain_id) {

        let i, len, network, network_name, ref;
        ref = Object.keys(_this.networks);

        for (i = 0, len = ref.length; i < len; i++) {

            network_name = ref[i];
            network = _this.networks[network_name];

            if (network.chain_id === chain_id) {

                _this.network_name = network_name;

                if (network.address_prefix) {
                    _this.address_prefix = network.address_prefix;
                    ecc_config.address_prefix = network.address_prefix;
                }

                // console.log("INFO    Configured for", network_name, ":", network.address_prefix, "\n");

                return {
                    network_name: network_name,
                    network: network
                };
            }
        }

        if (!_this.network_name) {
            console.log("Unknown chain id (this may be a testnet)", chain_id);
        }

    },

    reset: function () {
        _this.core_asset = "CORE";
        _this.address_prefix = ADDRESS_PREFIX;
        ecc_config.address_prefix = ADDRESS_PREFIX;
        _this.expire_in_secs = 15;
        _this.expire_in_secs_proposal = 24 * 60 * 60;

        console.log("Chain config reset");
    },

    setPrefix: function (prefix = ADDRESS_PREFIX) {
        _this.address_prefix = prefix;
        ecc_config.address_prefix = prefix;
    }
};

export default _this;
