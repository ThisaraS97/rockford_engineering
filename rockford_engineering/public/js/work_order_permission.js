frappe.ui.form.on('Vehicle Repair Work Order', {
    refresh: function(frm) {
        // Check if the user has the 'Technician' role and does NOT have the 'Supervisor' role
        if (frappe.user.has_role('Technician') && !frappe.user.has_role('Supervisor')) {
            // Hide 'customer' and 'date' fields for Technician role only
            frm.set_df_property('customer', 'hidden', true);
            frm.set_df_property('date', 'hidden', true);
            frm.set_df_property('vehicle', 'read_only', false);  // Make vehicle field editable for Technician

        } else {
            // If Technician role is unassigned, or user has Supervisor role, show all fields
            frm.set_df_property('customer', 'hidden', false);
            frm.set_df_property('date', 'hidden', false);
            frm.set_df_property('vehicle', 'read_only', false);  // Ensure vehicle is editable for non-Technicians
        }
    }
});
