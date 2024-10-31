frappe.ui.form.on('Customer', {
    onload: function(frm) {
        // Call the function to fetch and display vehicle list
        fetch_vehicle_list(frm);
    }
});

function fetch_vehicle_list(frm) {
    // Fetching vehicle data associated with the customer
    frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'Customer Vehicle List', // Use your Vehicle DocType name
            filters: {
                vehicle_owner: frm.doc.name // Assuming 'owner' is the link field in Customer Vehicles
            },
            fields: ['vehicle_number', 'make', 'model', 'year'] // Fetching required fields
        },
        callback: function(response) {
            let html = '<table class="table table-bordered"><thead><tr><th>Vehicle Number</th><th>Make</th><th>Model</th><th>Year</th></tr></thead><tbody>';

            if (response.message && response.message.length > 0) {
                // Construct HTML table with vehicle data
                response.message.forEach(vehicle => {
                    html += `<tr>
                                <td>${vehicle.vehicle_number}</td>
                                <td>${vehicle.make}</td>
                                <td>${vehicle.model}</td>
                                <td>${vehicle.year}</td>
                             </tr>`;
                });
            } else {
                html += '<tr><td colspan="4">No vehicles found.</td></tr>';
            }

            html += '</tbody></table>';

            // Set the HTML content in the 'custom_vehicle' HTML field
            frm.set_df_property('custom_vehicle', 'options', html);
            frm.refresh_field('custom_vehicle');
        }
    });
}

