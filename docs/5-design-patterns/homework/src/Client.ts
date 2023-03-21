import { Letter, Oversize, Package, Shipment } from './Shipment';
import { ShipmentData, ShipmentType } from './shipment.model';
import { fetchShipment } from './fetching.service';
import {
    AirEastShipper,
    AirEastShipperImplementer,
    ChicagoSprintShipper,
    ChicagoSprintShipperImplementer,
    PacificParcelShipper, PacificParcelShipperImplementer
} from './Shipper';
import { Context } from './Context';
import { SpecialCodesShipmentDecorator } from './ShipmentDecorator';

export class Client {
    private shipmentData: ShipmentData;
    private arrayChicagoSprint: string[] = ['4', '5', '6'];
    private arrayPacificParcel: string[] = ['7', '8', '9'];

    public processing() {
        this.shipmentData = this.getShipmentData();
        if (this.shipmentData.weight <= 0) {
            return new Error('Shipment has to have same weight');
        }

        const shipment: ShipmentType = this.getInstance();
        const { weight, fromZipCode, type } = shipment.shipmentItem;
        const firstSymbolFromZipCode = fromZipCode.slice(0,1);
        let ctx = new Context();
        this.arrayChicagoSprint.includes(firstSymbolFromZipCode) ?
            ctx.setShipper(new ChicagoSprintShipper(new ChicagoSprintShipperImplementer())) :
                this.arrayPacificParcel.includes(firstSymbolFromZipCode) ?
                    ctx.setShipper(new PacificParcelShipper(new PacificParcelShipperImplementer())) :
                        ctx.setShipper(new AirEastShipper(new AirEastShipperImplementer()));

        console.log((new SpecialCodesShipmentDecorator(shipment)).ship(shipment.shipmentItem, ctx.getShipperCost(weight, type)));
    }

    private getShipmentData(): ShipmentData {
        let item: ShipmentData;
        fetchShipment().subscribe((shipment: ShipmentData) => item = shipment);
        if (item.shipmentID === 0) item = {...item, shipmentID: Shipment.getShipmentID()};

        return item;
    }

    private getInstance(): ShipmentType {
        let shipment: ShipmentType;
        this.shipmentData.weight <= 15 ? shipment = Letter.getInstance(this.shipmentData) :
            this.shipmentData.weight <= 160 ? shipment = Package.getInstance(this.shipmentData) :
                shipment = Oversize.getInstance(this.shipmentData);

        return shipment;
    }
}

const client = new Client();
client.processing();