import React, { useState, useEffect } from 'react';
import { TeamTable } from '../../components/teams/TeamTable';
import { CreateTeamModal } from '../../components/teams/CreateTeamModal';
import { TeamDetailsModal } from '../../components/teams/TeamDetailsModal';
import { Toast } from '../../components/common/Toast';
import {
  getTeams,
  addTeam,
  updateTeam,
  deleteTeam,
  getSessionUser
} from '../../services/mockService';

export const TeamsPage = () => {
  const user = getSessionUser();
  const orgId = user?.orgId || 'ORG-001';
  const orgName = user?.orgName || 'National Infrastructure Authority';

  const [teams, setTeams] = useState([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const loadData = () => {
    setTeams(getTeams(orgId));
  };

  useEffect(() => {
    loadData();
  }, [orgId]);

  const handleCreateOrUpdateTeam = (teamData) => {
    if (teamToEdit) {
      updateTeam(teamData.id, teamData);
      setToastMessage(`Team "${teamData.name}" updated successfully.`);
    } else {
      addTeam({ ...teamData, orgId, orgName });
      setToastMessage(`Inspection Team "${teamData.name}" authorized & formed.`);
    }
    loadData();
    setTeamToEdit(null);
  };

  const handleEdit = (team) => {
    setTeamToEdit(team);
    setCreateModalOpen(true);
  };

  const handleDelete = (teamId) => {
    if (window.confirm('Are you sure you want to decommission this field inspection unit?')) {
      deleteTeam(teamId);
      loadData();
      setToastMessage(`Team #${teamId} decommissioned.`);
    }
  };

  return (
    <div>
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      <TeamTable
        teams={teams}
        onViewDetails={(team) => setSelectedTeam(team)}
        onEditTeam={handleEdit}
        onDeleteTeam={handleDelete}
        onCreateTeam={() => {
          setTeamToEdit(null);
          setCreateModalOpen(true);
        }}
      />

      <CreateTeamModal
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setTeamToEdit(null);
        }}
        onSubmit={handleCreateOrUpdateTeam}
        teamToEdit={teamToEdit}
        orgId={orgId}
        orgName={orgName}
      />

      <TeamDetailsModal
        isOpen={!!selectedTeam}
        onClose={() => setSelectedTeam(null)}
        team={selectedTeam}
      />
    </div>
  );
};
