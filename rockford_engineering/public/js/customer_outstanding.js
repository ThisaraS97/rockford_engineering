frappe.ui.form.on("Customer", {
    refresh: function(frm) {
        // Add an "Outstanding" button
        frm.add_custom_button(__('Outstanding'), function() {
            // Get customer name and encode it for the URL
            let customer_name = encodeURIComponent(frm.doc.customer_name);
            let company_name = encodeURIComponent("RockFord Engineering (Demo)");
            let report_date = frappe.datetime.nowdate();

            // Construct the report URL with parameters
            let report_url = `/app/query-report/Accounts%20Receivable?company=${company_name}&report_date=${report_date}&party_type=Customer&party=["${customer_name}"]&ageing_based_on=Due%20Date&range=30,%2060,%2090,%20120`;

            // Open the URL in a new tab
            window.open(report_url, '_blank');
        });
    }
});