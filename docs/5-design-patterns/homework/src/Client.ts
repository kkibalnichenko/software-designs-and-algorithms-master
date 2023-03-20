import { Shipment, ShipmentData } from "./Shipment";
import { fetchShipment } from "./fetching.service";

export class Client {
    private shipment: ShipmentData;

    public processing() {
        const shipment = Shipment.getInstance(this.getShipmentData());
        console.log(Shipment.ship(shipment.shipmentItem));
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