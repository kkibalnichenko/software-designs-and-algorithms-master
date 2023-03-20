import { Shipment, ShipmentData } from './Shipment';
import { fetchShipment } from './fetching.service';
import { AirEastShipper, ChicagoSprintShipper, PacificParcelShipper } from './Shipper';
import { Context } from './Context';

export class Client {
    private shipment: ShipmentData;

    public processing() {
        const shipment = Shipment.getInstance(this.getShipmentData());
        const { weight, fromZipCode } = shipment.shipmentItem;
        const arrayChicagoSprint = ['4', '5', '6'];
        const arrayPacificParcel = ['7', '8', '9'];
        let ctx = new Context();
        arrayChicagoSprint.includes(fromZipCode.slice(0,1)) ?
            ctx.setShipper(new ChicagoSprintShipper()) : arrayPacificParcel.includes(fromZipCode.slice(0,1)) ?
                ctx.setShipper(new PacificParcelShipper()) : ctx.setShipper(new AirEastShipper());

        console.log(Shipment.ship(shipment.shipmentItem, ctx.getShipperCost(weight)));
    }

    private getShipmentData(): ShipmentData {
        fetchShipment().subscribe((shipment: ShipmentData) => this.shipment = shipment);
        if (this.shipment.shipmentID === 0)
            this.shipment = {...this.shipment, shipmentID: Shipment.getShipmentID()};
        return this.shipment;
    }
}

const client = new Client();
client.processing();