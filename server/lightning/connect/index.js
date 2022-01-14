// const fs = require("fs");
// const grpc = require("@grpc/grpc-js");
// const protoLoader = require("@grpc/proto-loader");
// const loaderOptions = {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// };
// const packageDefinition = protoLoader.loadSync(
//   [
//     "./lightning/rpc/lightning.proto",
//     "./lightning/rpc/invoices.proto",
//     "./lightning/rpc/router.proto",
//   ],
//   loaderOptions
// );
// const lnrpc = grpc.loadPackageDefinition(packageDefinition).lnrpc;
// const invoicesrpc = grpc.loadPackageDefinition(packageDefinition).invoicesrpc;
// const routerrpc = grpc.loadPackageDefinition(packageDefinition).routerrpc;

// const macaroon = fs
//   .readFileSync(
//     "/Users/suhailsaqan/.polar/networks/2/volumes/lnd/alice/data/chain/bitcoin/regtest/admin.macaroon"
//   )
//   .toString("hex");
// process.env.GRPC_SSL_CIPHER_SUITES = "HIGH+ECDSA";
// const lndCert = fs.readFileSync(
//   "/Users/suhailsaqan/.polar/networks/2/volumes/lnd/alice/tls.cert"
// );
// const sslCreds = grpc.credentials.createSsl(lndCert);
// const macaroonCreds = grpc.credentials.createFromMetadataGenerator(function (
//   args,
//   callback
// ) {
//   let metadata = new grpc.Metadata();
//   metadata.add("macaroon", macaroon);
//   callback(null, metadata);
// });
// let creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);

// let lightning = new lnrpc.Lightning("localhost:10001", creds);
// let invoices = new invoicesrpc.Invoices("localhost:10001", creds);
// let router = new routerrpc.Router("localhost:10001", creds);

// module.exports = { lightning, invoices, router };

const { authenticatedLndGrpc } = require("lightning");
const lnService = require("ln-service");

const { lnd } = authenticatedLndGrpc({
  cert:
    "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNKekNDQWN5Z0F3SUJBZ0lRZDczTU5tUldweGNPQURPMWRhNGxCREFLQmdncWhrak9QUVFEQWpBeE1SOHcKSFFZRFZRUUtFeFpzYm1RZ1lYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1RNHdEQVlEVlFRREV3VmhiR2xqWlRBZQpGdzB5TWpBeE1UTXdORE0yTVRGYUZ3MHlNekF6TVRBd05ETTJNVEZhTURFeEh6QWRCZ05WQkFvVEZteHVaQ0JoCmRYUnZaMlZ1WlhKaGRHVmtJR05sY25ReERqQU1CZ05WQkFNVEJXRnNhV05sTUZrd0V3WUhLb1pJemowQ0FRWUkKS29aSXpqMERBUWNEUWdBRVJSSWVBY1ZXSjVpeUY1UldESWE2b3hGSnh2aUJPTFQrNFZ4MGtFWm1DM3hTa2tWSQowcEhhbTF2OEFldDc5TUJhWmlvOVNodTNYbnN4YU8vL0Q0WDZlcU9CeFRDQndqQU9CZ05WSFE4QkFmOEVCQU1DCkFxUXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUhBd0V3RHdZRFZSMFRBUUgvQkFVd0F3RUIvekFkQmdOVkhRNEUKRmdRVUt4T2YyMnFtMHdvaEt2WmQxVVRaUnNyWm9HNHdhd1lEVlIwUkJHUXdZb0lGWVd4cFkyV0NDV3h2WTJGcwphRzl6ZElJRllXeHBZMldDRG5CdmJHRnlMVzR5TFdGc2FXTmxnZ1IxYm1sNGdncDFibWw0Y0dGamEyVjBnZ2RpCmRXWmpiMjV1aHdSL0FBQUJoeEFBQUFBQUFBQUFBQUFBQUFBQUFBQUJod1NzRWdBRE1Bb0dDQ3FHU000OUJBTUMKQTBrQU1FWUNJUUNaZmhxOFRyNkdkS0lLQmk5aE4yNVFvN2pDYktnUGh4eGFwMEZYM2ZNSWVBSWhBUG1VT3hWSAp6NDNmc2NEZFoxd3ZQK1cvY1NyT0hJRzRqTW0vV0NNYUZEYysKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=",
  macaroon:
    "AgEDbG5kAvgBAwoQlXpAXu+ZjI01EHcQ320S1BIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYgNu4LWBLH0XF81cnWI8QL7+1bZXlaFn0HmRrB7vobkT8=",
  socket: "127.0.0.1:10001",
});

module.exports = lnd;
