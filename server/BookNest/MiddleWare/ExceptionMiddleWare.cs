using System.Net;
using BookNest.Exceptions;

namespace BookNest.MiddleWare;

public class ExceptionMiddleWare
{
    private readonly ILogger<ExceptionMiddleWare> _logger;
    private readonly RequestDelegate _next;

    public ExceptionMiddleWare(ILogger<ExceptionMiddleWare> logger, RequestDelegate next)
    {
        _logger = logger;
        _next = next;
    }

    public async Task InvokeAsync(HttpContext _context)
    {
        try
        {
            await _next(_context);
        }
        catch (Exception e)
        {
            _logger.LogError(e, $"Something went wrong on Path {_context.Request.Path}");
            await handelException(_context, e);
        }
    }

    public async Task handelException(HttpContext ctx, Exception exception)
    {
        ctx.Response.ContentType = "application/json";
        var status = HttpStatusCode.InternalServerError;
        var errorDetails = new ErrorDetails
        {
            message = exception.Message,
            status = "failure",
            stack = exception.StackTrace
        };
        switch (exception)
        {
            case AppErrorResponse appErrorResponse:
                status = HttpStatusCode.NotFound;
                break;
        }

        ctx.Response.StatusCode = (int)status;


        await ctx.Response.WriteAsJsonAsync(errorDetails);
    }
}