import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useDrAdmin } from "@/providers/DrAdminProvider";
import { User, UserCheck, Shield, Clock, Settings, LogOut } from "lucide-react";

export function DrAdminPanel() {
  const { currentUser, users, getOnlineUsers, getUsersByRole, logout, hasPermission } = useDrAdmin();

  const onlineUsers = getOnlineUsers();
  const doctors = getUsersByRole('doctor');
  const nurses = getUsersByRole('nurse');

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'doctor': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'admin': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'nurse': return 'bg-green-100 text-green-700 border-green-200';
      case 'staff': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (!currentUser) {
    return (
      <Card className="medical-card">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Please log in to access the admin panel.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current User Info */}
      <Card className="medical-card overflow-hidden hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg text-foreground">{currentUser.name}</h3>
                <p className="text-sm text-muted-foreground">{currentUser.department}</p>
                <Badge className={getRoleColor(currentUser.role)}>
                  <Shield className="w-3 h-3 mr-1" />
                  {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {hasPermission('admin') && (
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Online Staff */}
        <Card className="medical-card overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="medical-card-header bg-gradient-to-r from-green-50 to-green-100 dark:from-green-800 dark:to-green-900">
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-green-600" />
              <span>Online Staff</span>
              <Badge variant="outline" className="ml-auto bg-green-100 text-green-700 border-green-200">
                {onlineUsers.length} Online
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {onlineUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.department}</p>
                    </div>
                  </div>
                  <Badge className={getRoleColor(user.role)} variant="outline">
                    {user.role}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Overview */}
        <Card className="medical-card overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="medical-card-header bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-800 dark:to-blue-900">
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <span>Staff by Role</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-foreground">Doctors</span>
                </div>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                  {doctors.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-foreground">Nurses</span>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  {nurses.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-medium text-foreground">Total Staff</span>
                </div>
                <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                  {users.length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Staff Directory */}
      <Card className="medical-card overflow-hidden hover:shadow-lg transition-all duration-300">
        <CardHeader className="medical-card-header bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-primary" />
            <span>Staff Directory</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user) => (
              <div key={user.id} className="p-4 border border-border/20 rounded-xl hover:bg-accent/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.department}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getRoleColor(user.role)} variant="outline">
                      {user.role}
                    </Badge>
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {user.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}