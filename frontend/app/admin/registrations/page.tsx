import EventViewRegistrations from "@/components/admin/Registrations/EventViewRegistrations";


function RegistrationsPage() {
    return ( 
        <div className="w-full">
            <div>
                <h1 className="text-2xl font-bold">Browse all registration</h1>
                <p className="text-sm text-muted-foreground">Here you found each event and Registrations attached to it</p>
            </div>
            <EventViewRegistrations />
        </div>
     );
}

export default RegistrationsPage;