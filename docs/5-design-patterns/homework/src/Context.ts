import { Shipper } from './Shipper';
import { ShipmentDataType } from './shipment.model';

export class Context {
    private shipper: Shipper;

    setShipper(s: Shipper) {
        this.shipper = s;
    }

    getShipperCost(weight: number, type: ShipmentDataType) {
        return this.shipper.getCost(weight, type);
    }
}