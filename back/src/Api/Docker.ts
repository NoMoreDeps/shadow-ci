import Dockerode from "dockerode";

class Docker {
  private _dockerode: Dockerode;

  constructor(options: DockerOptions) {
    this._dockerode = new Dockerode(options);
  }

  async createVolume() {
    return await this._dockerode.createVolume({"Name": "cc"});
  }

  async cleanAll() {
    await this._dockerode.pruneContainers();
    await this._dockerode.pruneVolumes();
  }

  async run(options: RunOptions): Promise<any> {
    
    return new Promise<any>( (r,x) => {
      this._dockerode.run(
        options.image                           , 
        options.cmd                             ,
        options.outputStream                    , 
        options.createOptions as unknown as any , 
        void 0 as unknown as any, 
        (error, result) => {
        if (error) {
          x(error);
        } else {
          r(result);
        }
      });
    })
  }
}

export const docker = new Docker({
  host: '127.0.0.1',
  port: process.env.DOCKER_PORT || 2375,
  version: 'v1.25' 
})

export const start = async () => {
  await docker.createVolume();
}

export const stop = async () => {
  await docker.cleanAll();
}

let pwd = "./";

export const getPwd = () => {
  return pwd;
}

export const setPwd = (path: string) => {
  pwd = path;
}

interface RunOptions {
  image : string;
  cmd   : Array<string>;
  outputStream: NodeJS.WritableStream;
  createOptions: ContainerCreateOptions | undefined;
}

interface DockerOptions {
  socketPath?: string;
  host?: string;
  port?: number | string;
  ca?: string | string[] | Buffer | Buffer[];
  cert?: string | string[] | Buffer | Buffer[];
  key?: string | string[] | Buffer | Buffer[] | KeyObject[];
  protocol?: "https" | "http";
  timeout?: number;
  version?: string;
  Promise?: typeof Promise;
}

interface KeyObject {
  pem: string | Buffer;
  passphrase?: string;
}

interface ContainerCreateOptions {
  name?: string;
  Hostname?: string;
  Domainname?: string;
  User?: string;
  AttachStdin?: boolean;
  AttachStdout?: boolean;
  AttachStderr?: boolean;
  Tty?: boolean;
  OpenStdin?: boolean;
  StdinOnce?: boolean;
  Env?: string[];
  Cmd?: string[];
  Entrypoint?: string;
  Image?: string;
  Labels?: { [label: string]: string };
  Volumes?: { [volume: string]: {} };
  WorkingDir?: string;
  NetworkDisabled?: boolean;
  MacAddress?: boolean;
  ExposedPorts?: { [port: string]: {} };
  StopSignal?: string;
  HostConfig?: {
    AutoRemove?: boolean;
    Binds?: string[];
    Links?: string[];
    Memory?: number;
    MemorySwap?: number;
    MemoryReservation?: number;
    KernelMemory?: number;
    CpuPercent?: number;
    CpuShares?: number;
    CpuPeriod?: number;
    CpuQuota?: number;
    CpusetMems?: string;
    MaximumIOps?: number;
    MaxmimumIOBps?: number;
    BlkioWeightDevice?: Array<{}>;
    BlkioDeviceReadBps?: Array<{}>;
    BlkioDeviceReadIOps?: Array<{}>;
    BlkioDeviceWriteBps?: Array<{}>;
    BlkioDeviceWriteIOps?: Array<{}>;
    Mounts:Array<{
      Target: string;
      Source: string;
      Type?:"bind"| "volume"| "tmpfs";
      ReadOnly: boolean;
    }>;
    MemorySwappiness?: number;
    OomKillDisable?: boolean;
    OomScoreAdj?: number;
    PidMode?: string;
    PidsLimit?: number;
    PortBindings?: PortMap;
    PublishAllPorts?: boolean;
    Privileged?: boolean;
    ReadonlyRootfs?: boolean;
    Dns?: string[];
    DnsOptions?: string[];
    DnsSearch?: string[];
    ExtraHosts?: any;
    VolumesFrom?: string[];
    CapAdd?: string[];
    CapDrop?: string[];
    GroupAdd?: string[];
    RestartPolicy?: RestartPolicy;
    NetworkMode?: string;
    Devices?: DeviceMapping[];
    Sysctls?: { [index: string]: string };
    Ulimits?: Array<{}>;
    LogConfig?: LogConfig;
    SecurityOpt?: { [index: string]: any };
    CgroupParent?: string;
    VolumeDriver?: string;
    ShmSize?: number;
  };
  NetworkingConfig?: {
    EndpointsConfig?: EndpointsConfig;
  };
}

interface EndpointsConfig {
  [key: string]: EndpointSettings;
}

interface EndpointSettings {
  IPAMConfig?: IPAMConfig;
  Links?: string[];
  Aliases?: string[];
  NetworkID?: string;
  EndpointID?: string;
  Gateway?: string;
  IPAddress?: string;
  IPPrefixLen?: number;
  IPv6Gateway?: string;
  GlobalIPv6Address?: string;
  GlobalIPV6PrefixLen?: number;
  MacAddress?: string;
  DriverOpts?: {[key: string]: string};
}

interface IPAMConfig {
  IPv4Address?: string;
  IPv6Address?: string;
  LinkLocalIPs?: string[];
}
type LoggingDriverType =
| "json-file"
| "syslog"
| "journald"
| "gelf"
| "fluentd"
| "awslogs"
| "splunk"
| "etwlogs"
| "none";

interface LogConfig {
  Type: LoggingDriverType;
  Config?: { [key: string]: string };
}


interface AuthConfig {
  username: string;
  password: string;
  serveraddress: string;
  email?: string;
}

interface PortBinding {
  HostIp?: string;
  HostPort?: string;
}

interface PortMap {
  [key: string]: PortBinding[];
}

interface RestartPolicy {
  Name: string;
  MaximumRetryCount?: number;
}

interface DeviceMapping {
  PathOnHost: string;
  PathInContainer: string;
  CgroupPermissions: string;
}