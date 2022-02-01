import { BleManager } from 'react-native-ble-plx';

export const create = () => { 
  manager = new BleManager();
};

export const setLogLevel = logLevel => {
    manager.setLogLevel(logLevel);
};

export const restart = () => { 
  manager.destroy(); 
  create();
};

export const cancelConnection = machineId => manager.cancelDeviceConnection(machineId);

create();

export let manager;