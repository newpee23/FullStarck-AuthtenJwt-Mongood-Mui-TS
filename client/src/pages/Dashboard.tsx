import TableAdmin from "../components/form/TableAdmin";
import AppBarMenu from "../components/shatters/AppBarMenu";
import './dashboard.css';
type Props = {}

const Dashboard = ({ }: Props) => {
    return (
        <>
        <AppBarMenu/>
        <TableAdmin/>
        </>
    )
}

export default Dashboard;