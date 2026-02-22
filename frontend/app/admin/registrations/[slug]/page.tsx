import EvenstRegistrationsList from "@/components/admin/Registrations/EvenstRegistrationsList";

async function EvenstRegistrationsListPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params
    return ( 
        <div>
            <EvenstRegistrationsList id={slug} />
        </div>
     );
}

export default EvenstRegistrationsListPage;