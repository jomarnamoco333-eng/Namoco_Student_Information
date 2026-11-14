module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define("Teacher", {
    teacher_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Teacher.associate = (models) => {
    Teacher.hasMany(models.Course, {
      foreignKey: "teacher_id",
    });
  };

  return Teacher;
};
