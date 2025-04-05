export default function FacultyDashboard({ user }) {
    // Remove the override and extract values properly
    const { name, email, role, departments = [] } = user || {};

    console.log("user is", user);

    return (
        <div className="flex">
        
            <div className="p-5">
                <h1>Welcome, {name} ({role})</h1>
                <p>Email: {email}</p>
                <p>Departments:</p>
                <ul className="list-disc pl-6">
                    {departments.map((dept) => (
                        <li key={dept._id}>{dept.name}</li>
                    ))}
                </ul>
                <button type="button" className="btn rounded-pill btn-primary">Primary</button>
            </div>
        </div>
    );
}
