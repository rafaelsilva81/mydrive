
interface ActionButtonProps {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
}

const MenuActionButton = (props: ActionButtonProps) => {
    return (
        <button id="action-button" className="flex disabled:bg-slate-50 disabled:text-slate-500 items-center w-full text-left p-2 hover:bg-gray-100 hover:text-teal-600 rounded-lg" onClick={props.onClick} disabled={props.disabled}>
            {/* Get child */}
            {props.children}
        </button>
    )
}

export { MenuActionButton }

