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
    "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNKakNDQWN5Z0F3SUJBZ0lRTmZNTWgwb0xSeGFlcm5zcWlXM0lYREFLQmdncWhrak9QUVFEQWpBeE1SOHcKSFFZRFZRUUtFeFpzYm1RZ1lYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1RNHdEQVlEVlFRREV3VmhiR2xqWlRBZQpGdzB5TWpBeE1EVXdNakF5TVRSYUZ3MHlNekF6TURJd01qQXlNVFJhTURFeEh6QWRCZ05WQkFvVEZteHVaQ0JoCmRYUnZaMlZ1WlhKaGRHVmtJR05sY25ReERqQU1CZ05WQkFNVEJXRnNhV05sTUZrd0V3WUhLb1pJemowQ0FRWUkKS29aSXpqMERBUWNEUWdBRWRuLzh3NmM4bnZMRnhKOGxCZzZEVUR3dkgvaG1PVmhrZzVqZTBvY0hRMjV1ZGR0SApNREh1TWRtUmNmVnl5VFJGSTgwOWQvZWxBWENJUUtCNy9sYzRBS09CeFRDQndqQU9CZ05WSFE4QkFmOEVCQU1DCkFxUXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUhBd0V3RHdZRFZSMFRBUUgvQkFVd0F3RUIvekFkQmdOVkhRNEUKRmdRVVBsY2Q0VGZvaEsza0xJSFlvUk9kUGVhc2pXd3dhd1lEVlIwUkJHUXdZb0lGWVd4cFkyV0NDV3h2WTJGcwphRzl6ZElJRllXeHBZMldDRG5CdmJHRnlMVzR5TFdGc2FXTmxnZ1IxYm1sNGdncDFibWw0Y0dGamEyVjBnZ2RpCmRXWmpiMjV1aHdSL0FBQUJoeEFBQUFBQUFBQUFBQUFBQUFBQUFBQUJod1NzRWdBRU1Bb0dDQ3FHU000OUJBTUMKQTBnQU1FVUNJUUNGUjJZY1dUVTNUYXYvanpNY1dSdm8ySlE4SEtSOERoSU9XMHc2M0NST3dRSWdGNVNLdWQvbwpqRGU2QVJMVDl3WWhYVnRQMGlnSU15bm1sS3BxR1podlhCND0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=",
  macaroon:
    "AgEDbG5kAvgBAwoQjI1Wf8j+bEhAZm0l2oe5NBIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYgKhm6uVl73LxbNjyog0iTDvMpWVMeTIJaKl9Hc/iBCbU=",
  socket: "127.0.0.1:10001",
});

module.exports = lnd;
