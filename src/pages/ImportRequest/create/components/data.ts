import { UseGetTableResponseType } from "@/types/CompositeTable"
import { ImportRequestDetails } from "@/types/ImportRequestType"

export const details = [
    {
        materialId: '1',
        materialName: 'Material 1',
        SKU: 'SKU1',
        UOM: 'UOM1',
        actualQuantity: 10,
        plannedQuantity: 10
    },
    {
        materialId: '2',
        materialName: 'Material 2',
        SKU: 'SKU2',
        UOM: 'UOM2',
        actualQuantity: 20,
        plannedQuantity: 20
    },
    {
        materialId: '3',
        materialName: 'Material 3',
        SKU: 'SKU3',
        UOM: 'UOM3',
        actualQuantity:30,
        plannedQuantity: 30
    },
    {
        materialId: '4',
        materialName: 'Material 4',
        SKU: 'SKU4',
        UOM: 'UOM4',
        actualQuantity: 40,
        plannedQuantity: 40
    },
    {
        materialId: '5',
        materialName: 'Material 5',
        SKU: 'SKU5',
        UOM: 'UOM5',
        actualQuantity: 50,
        plannedQuantity: 50
    }
]

export const detailsForTable: UseGetTableResponseType<ImportRequestDetails>={
    limit: 10,
    page: 1,
    total: 20, // assuming there are 20 total records in the system
    totalFiltered: 10, // assuming 10 records are shown after filtering
    data: [

        {
            materialId: '1',
            materialName: 'Material 1',
            SKU: 'SKU1',
            UOM: 'UOM1',
            actualQuantity: 10,
            plannedQuantity: 10
        },
        {
            materialId: '2',
            materialName: 'Material 2',
            SKU: 'SKU2',
            UOM: 'UOM2',
            actualQuantity: 20,
            plannedQuantity: 20
        },
        {
            materialId: '3',
            materialName: 'Material 3',
            SKU: 'SKU3',
            UOM: 'UOM3',
            actualQuantity:30,
            plannedQuantity: 30
        },
        {
            materialId: '4',
            materialName: 'Material 4',
            SKU: 'SKU4',
            UOM: 'UOM4',
            actualQuantity: 40,
            plannedQuantity: 40
        },
        {
            materialId: '5',
            materialName: 'Material 5',
            SKU: 'SKU5',
            UOM: 'UOM5',
            actualQuantity: 50,
            plannedQuantity: 50
        }
    ]
}