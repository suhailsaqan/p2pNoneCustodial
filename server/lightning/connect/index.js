const fs = require("fs");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const loaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
const packageDefinition = protoLoader.loadSync(
  [
    "./lightning/rpc/lightning.proto",
    "./lightning/rpc/invoices.proto",
    "./lightning/rpc/router.proto",
  ],
  loaderOptions
);
const lnrpc = grpc.loadPackageDefinition(packageDefinition).lnrpc;
const invoicesrpc = grpc.loadPackageDefinition(packageDefinition).invoicesrpc;
const routerrpc = grpc.loadPackageDefinition(packageDefinition).routerrpc;

const macaroon = fs
  .readFileSync(
    "/Users/suhailsaqan/.polar/networks/2/volumes/lnd/alice/data/chain/bitcoin/regtest/admin.macaroon"
  )
  .toString("hex");
process.env.GRPC_SSL_CIPHER_SUITES = "HIGH+ECDSA";
const lndCert = fs.readFileSync(
  "/Users/suhailsaqan/.polar/networks/2/volumes/lnd/alice/tls.cert"
);
const sslCreds = grpc.credentials.createSsl(lndCert);
const macaroonCreds = grpc.credentials.createFromMetadataGenerator(function (
  args,
  callback
) {
  let metadata = new grpc.Metadata();
  metadata.add("macaroon", macaroon);
  callback(null, metadata);
});
let creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);

let lightning = new lnrpc.Lightning("localhost:10001", creds);
let invoices = new invoicesrpc.Invoices("localhost:10001", creds);
let router = new routerrpc.Router("localhost:10001", creds);

module.exports = { lightning, invoices, router };
