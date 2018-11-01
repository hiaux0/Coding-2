
// /projects?group_id=&only_root_level=&folder_id=&limit=&offset=
function getProjects({groupId, onlyRootLevel, folderId, limit, offset} = {}) {
  let route = 'projects';

  groupId = groupId ? `?group_Id=${groupId}` : '';
  onlyRootLevel = onlyRootLevel ? `&only_root_level=${onlyRootLevel}` : '';
  folderId = folderId ? `&folder_id=${folderId}` : '';
  limit = limit ? `&limit=${limit}` : '';
  offset = offset ? `&offset=${offset}` : '';

  let url = route + groupId + onlyRootLevel + folderId + limit + offset;
  return url;
}
