using Microsoft.EntityFrameworkCore;
using BookNest.Contracts;
using BookNest.Data;
using BookNest.Exceptions;

namespace BookNest.Repository;

public class GenricRepository<T> : IGenricRepository<T> where T : class
{
    private readonly BookNestDBContext _context;

    public GenricRepository(BookNestDBContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<T> GetAsync(int id)
    {
        var x = await _context.Set<T>().FindAsync(id);
        if (x == null) throw new AppErrorResponse("Could not find Genric with ID: " + id);
        return x;
    }

    public async Task<T> AddAsync(T entity)
    {
        _context.Set<T>().AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(T entity)
    {
        _context.Set<T>().Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var x = await GetAsync(id);
        _context.Remove(x);
        await _context.SaveChangesAsync();
    }
}