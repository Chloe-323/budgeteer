

export const UserChip: React.FC = () => {
    return (
        <div className="absolute inset-y-0 right-0 gap-2 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <a href="/login" className="btn-primary text-sm">
            <span>Log In</span>
        </a>
        <a href="/signup" className="btn-secondary text-sm">
            <span>Sign Up</span>
        </a>
        </div>
    )
}