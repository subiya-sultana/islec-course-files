export default function FacultyDashboard({ user }) {
    console.log("user is" , user)
    return (
        <div className="flex">
            <div className="p-5">
                <h1>Welcome, {user.name} (Faculty)</h1>
                <p>Your assigned subjects, tasks, and materials will be shown here.</p>
            </div>
        </div>
    );
}
