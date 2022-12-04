use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::CanonicalAddr;

use crate::state::Permission;

/// token
#[derive(Serialize, Deserialize)]
pub struct Token {
    /// owner
    pub owner: CanonicalAddr,
    /// permissions granted for this token
    pub permissions: Vec<Permission>,
    /// true if this token has been unwrapped.  If sealed metadata is not enabled, all
    /// tokens are considered unwrapped
    pub unwrapped: bool,
    /// true if this token is transferable
    pub transferable: bool,
}

/// token metadata
#[derive(Serialize, Deserialize, JsonSchema, Clone, PartialEq, Debug, Default)]
pub struct Metadata {
    /// optional uri for off-chain metadata.  This should be prefixed with `http://`, `https://`, `ipfs://`, or
    /// `ar://`.  Only use this if you are not using `extension`
    pub token_uri: Option<String>,
    /// optional on-chain metadata.  Only use this if you are not using `token_uri`
    pub extension: Option<Extension>,
}

/// metadata extension
/// You can add any metadata fields you need here.  These fields are based on
/// https://docs.opensea.io/docs/metadata-standards and are the metadata fields that
/// Stashh uses for robust NFT display.  Urls should be prefixed with `http://`, `https://`, `ipfs://`, or
/// `ar://`
#[derive(Serialize, Deserialize, JsonSchema, Clone, PartialEq, Debug, Default)]
pub struct Extension {
    /// url to the image
    pub image: Option<String>,
    /// item description
    pub description: Option<String>,
    /// name of the item
    pub name: Option<String>,
    /// item attributes
    pub attributes: Option<Vec<Trait>>,
    /// token subtypes used by Stashh for display groupings (primarily used for badges, which are specified
    /// by using "badge" as the token_subtype)
    pub token_subtype: Option<String>,
    /// list in bazaar
    pub is_listable: Option<String>,
    /// price
    pub price: Option<String>,
}

/// attribute trait
#[derive(Serialize, Deserialize, JsonSchema, Clone, PartialEq, Debug, Default)]
pub struct Trait {
    /// indicates how a trait should be displayed
    pub display_type: Option<String>,
    /// name of the trait
    pub trait_type: Option<String>,
    /// trait value
    pub value: String,
    /// optional max value for numerical traits
    pub max_value: Option<String>,
}

