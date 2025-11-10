using AutoMapper;
using BookNest.Data;
using BookNest.Models.users;

namespace BookNest.Configuration;

public class MapperConfig : Profile
{
    public MapperConfig()
    {
        CreateMap<UserDto, User>().ReverseMap();
        CreateMap<User, AuthRegister>().ReverseMap();
    }
}