import { Shipper } from './Shipper';

export class Context {
    private shipper: Shipper;

    setShipper(s: Shipper) {
        this.shipper = s;
    }

    getShipperCost(weight: number) {
        return this.shipper.getCost(weight);
    }
}