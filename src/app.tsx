import Button from "./components/Button";
import RoleTabs from "./components/RoleTabs";
import AddModal from "./components/AddModal";
import { useEffect, useState } from "preact/hooks";
import { getRoleMatches, Match, MatchRoles } from "./database";
import MatchList from "./components/MatchList";
import Icons from "./components/Icons";

export function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(MatchRoles.TANK);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    if (showModal) return;
    setMatches(getRoleMatches(selectedRole));
  }, [selectedRole, showModal])
  return (
    <>
      <RoleTabs defaultSelectedRole={selectedRole} onRoleClicked={setSelectedRole} />
      <Button 
        styles={{marginLeft: '20px'}} 
        title="Add" color="#2B92E1" 
        icon={<Icons name="add" />}
        onClick={() => setShowModal(true)}        
      />
      <MatchList matches={matches}/>
      <AddModal defaultRole={selectedRole} onCancelClicked={() => setShowModal(false)} show={showModal} />
    </>
  )
}