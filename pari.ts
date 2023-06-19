import * as web3 from "@solana/web3.js";
import * as sdk from "@hxronetwork/parimutuelsdk";

const config = sdk.MAINNET_CONFIG
const rpc = web3.clusterApiUrl('mainnet-beta')
const connection = new web3.Connection(rpc, 'confirmed')

const parimutuelWeb3 = new sdk.ParimutuelWeb3(config, connection)

const market = sdk.MarketPairEnum.BTCUSD
const markets = sdk.getMarketPubkeys(config, market);

const marketTerm = 60 // The expires are in seconds, so this would be the 1 min

const marketsByTime = markets.filter( (market) => market.duration === marketTerm );

const Paris = async () => {

    const parimutuels = await parimutuelWeb3.getParimutuels(marketsByTime, 5);
    
    console.log(`\\nMarket Pair: BTCUSD\\nMarket Expiry Interval: 1 min\\n`)
    
    const usdcDec = 1_000_000
    
    parimutuels.forEach((cont) => {
    const strike = cont.info.parimutuel.strike.toNumber() / usdcDec;
    
    const slotId = cont.info.parimutuel.slot.toNumber();
    
    const longSide = cont.info.parimutuel.activeLongPositions.toNumber() / usdcDec;
    
    const shortSide = cont.info.parimutuel.activeShortPositions.toNumber() / usdcDec;
    
    const expired = cont.info.parimutuel.expired
    
    console.log(`\\nStrike: $ ${strike}
    \\nSlot: ${slotId}
    \\nLongs: $ ${longSide}
    \\nShorts: $ ${shortSide}
    \\nExprired?: ${expired? 'true' : 'false'}`)
    })
    };
    
    Paris()